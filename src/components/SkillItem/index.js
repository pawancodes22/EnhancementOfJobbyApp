import './index.css'

const SkillItem = props => {
  const {item} = props
  const {name, imageUrl} = item
  return (
    <li className="si-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p>{name}</p>
    </li>
  )
}
export default SkillItem
