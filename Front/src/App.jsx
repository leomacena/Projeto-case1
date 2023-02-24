const Table = require('react-bootstrap')
const Container = require('react-bootstrap')
const Button = require('react-bootstrap')

const ContentsApi = require('./api/ContentsApi')
const useEffect = require('react')
const useState = require('react')
const CreateContentModal = require('./components/CreateContentModal')
const UpdateContentModal = require('./components/UpdateContentModal')

function App() {
  const [series, setContents] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await ContentsApi().getContents().then(data => {
        return data.json()
      })
      .then(data => {
        setContents(data)
      })
    }

    getData()
  }, [])

  async function deleteContent(contentId) {
    try {
      await ContentsApi().deleteContent(contentId)

      const formattedContents = contents.filter(cont => {
        if(cont.id !== contentId){
          return cont
        }
      })

      setContents(formattedContents)
    } catch(err) {
      throw err
    }
  }

  async function createContent(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await ContentsApi().createContent(
        req.titulo.value, Number(req.episodios.value), Number(req.temporadas.value), req.status.value
      ).then(data => {
        return data.json()
      }).then(res => {
        setContents([...series, {
          id: res.contentId,
          titulo: req.titulo.value,
          episodios: Number(req.episodios.value),
          temporadas: Number(req.temporadas.value),
          status: req.status.value
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateContent(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await ContentsApi().updateContent(
        selectedContent.id, Number(req.episodios.value), Number(req.temporadas.value), req.status.value
      )

      const formattedContents = contents.map(cont => {
        if(cont.id === selectedContent.id) {
          return {
            id: selectedContent.id,
            titulo: req.titulo.value,
            episodios: Number(req.episodios.value),
            temporadas: Number(req.temporadas.value),
            status: req.status.value
          }
        }

        return cont
      })

      setContents(formattedContents)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <>
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Criar Conteúdo
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Episodios</th>
            <th>Temporadas</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {contents && contents.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.episodios}</td>
              <td>{cont.temporadas}</td>
              <td>{cont.status}</td>
              <td>
                <Button onClick={() => deleteContent(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedContent(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateContentModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createContent={createContent} />
    {selectedContent && (
      <UpdateContentModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateContent={updateContent} content={selectedContent} />
    )}
    </>
  )
}

module.exports = App;
