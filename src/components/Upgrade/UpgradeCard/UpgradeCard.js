import './UpgradeCard.scss'

const UpgradeCard = ({className, children}) => {
    return (
        <div className={className}>
        {children}
        </div>
    )
}

export default UpgradeCard