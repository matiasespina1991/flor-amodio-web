import Flower from '../images/flower-menu.svg'
import FlowerAfter from '../images/flower-menu-after.svg'

export default function FlowerMenuIcon({handleFlowerIconOnClick, responsiveMenuIsExpanded}){ 
    return (
        <div onClick={() => handleFlowerIconOnClick()} className="flower-menu-container">
            <img className="flower-menu-icon" src={Flower.src} alt="" />
            <img className={`flower-menu-after-icon ${responsiveMenuIsExpanded ? "active" : ""}`} src={FlowerAfter.src} alt="" />
        </div>
        
    )
}