import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value
    dispatch(filterChange(filter))
  }
  const style = {
    marginTop: 20,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
