import { mapObjIndexed, values } from 'ramda'
import { Link } from 'react-router-dom'

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
                  <label>{key}</label>
                  <input
                    value={value}
                    disabled={true}
                    className="form-control"
                  />
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
      <div className="card">
        <CardHeader title={title} />
        <CardBody items={items} />
      </div>
    )
  }

export default Card
