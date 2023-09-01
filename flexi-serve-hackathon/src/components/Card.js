import { mapObjIndexed, values } from 'ramda'

const CardHeader = ({ title }) => {
    return (
      <div className="card-header">
        <h1>{title}</h1>
      </div>
    )
  },
  CardBody = ({ items }) => (
    <div className="card-body">
      <div className="row">
        {values(
          mapObjIndexed(
            (value, key) => (
              <div className="col-lg-6" key={key}>
                <div className="form-group">
                  <label>{key.toLocaleUpperCase()}</label>
                  {key === 'orders' ? (
                    <div
                      style={{
                        backgroundColor: '#0d6efd',
                        borderRadius: '5px',
                        padding: '5px',
                      }}
                    >
                      <a href="/order-history">View Orders</a>
                    </div>
                  ) : (
                    <input
                      value={
                        key === 'password'
                          ? value.replace(/\S(?=\S{2})/g, '*')
                          : value
                      }
                      disabled={true}
                      className="form-control"
                    />
                  )}
                </div>
              </div>
            ),
            items
          )
        )}
      </div>
    </div>
  ),
  Card = (props) => {
    const { title, items = {} } = props
    return (
      <div className="container">
        <div className="card">
          <CardHeader title={title} />
          <CardBody items={items} />
        </div>
      </div>
    )
  }

export default Card
