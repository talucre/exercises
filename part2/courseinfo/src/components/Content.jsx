import Part from './Part'

const Content = ({ parts }) => (
    <div>
        {parts.map(c => (
            <Part part={c} key={c.id} />
        ))}
    </div>
)

export default Content
