import React from 'react';
import { connect } from 'react-redux';
import { addId } from '../redux/Category';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../assets/css/inventory.css'

class Item extends React.Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }
    componentDidUpdate(prevProps) {
        if(prevProps.category.id !== this.props.category.id) {
            window.scrollTo(0,0)
        }
    }
    mapItem = () => {
        return this.props.inventory.filter(item => {
            if(item._id === this.props.category.id) {
                return item
            } else {
                return null;
            }
        }).map((item, i) => {
            var images = []
            item.images.map(image => {
                return images.push({
                    original: `${image}`,
                    thumbnail: `${image}`
                })
            })
            return (
            <div className="inventory-wrapper" key={item._id}>
                <div className="inventory-slider-container">
                    <ImageGallery items={images} lazyLoad={true} additionalClass="carousel" showFullscreenButton={false} showPlayButton={false} />
                </div>
                <div className="inventory-details-container">
                    <h2 className="inventory-name"> {item.name} </h2>
                    <p className="inventory-par"> {item.type} </p>
                    <p className="inventory-price"> ${this.addComma(item.price)} </p>
                    {item.hours
                    ?
                    <p className="inventory-hours"> {this.addComma(item.hours)} hours </p>
                    : null}
                    <p className="inventory-par"> {item.description} </p>
                    <div className="inventory-contact-container">
                        <h2 className="inventory-contact-header"> Contact </h2>
                        <p className="inventory-contact-name"> Brent Woods </p>
                        <a className="inventory-contact-phone" href="tel:6622297785"> (662) 229-7785 </a>
                        <p className="inventory-contact-email"> woodsforest@bellsouth.net </p>
                        <p className="inventory-location"> Grenada, Ms </p>
                    </div>
                </div>
            </div>
            )}
        )
    }
    addComma = (num) => {
        if(num.length > 3) {
            return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if(num) {
            return num;
        }
        return;
    }
    render() {
        console.log(this.props)
        return (
            this.props.category.id.length > 1 
            ?
            <div className="item-page">
                <div className="go-back">
                    <Link to="/inventory" onClick={this.handleClick} className="back-link">
                        <i className="fas fa-chevron-left fa-sm"></i>  
                        Back To Inventory
                    </Link>
                </div>
                {this.mapItem()}
            </div>
            : null
        )
    }
}

export default connect(state => state, { addId })(Item);