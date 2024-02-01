import './ZingContent.scss'

const ZingContent = ({className}) => {
    return (
        <div className={`h1 text-white ${className && className}`}>
            <span style={{color: '#008DC6'}}>Z</span>
            <span style={{color: '#49A942'}}>i</span>
            <span style={{color: '#F47B20'}}>n</span>
            <span style={{color: '#EE2B74'}}>g</span> mp3
        </div>
    )
}

export default ZingContent