import React, { Component, createRef } from 'react';
import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";
import "./Slider.scss";

class Slider extends Component {

    constructor() {
        super();
        this.swiperRef = createRef();
        this.state = {
            touched: false
        };
    }
    _onClick = (i) => {
        if(!this.state.touched) this.setState(({touched})=>({touched: !touched }));
        this.props.onVideoSelect(this.props.slides[i]);
        this.swiperRef.current.swiper.realIndex = i;
    }
    
	renderList() {
		return this.props.slides.map((video, i) => {
            const selectedIndex = this.swiperRef.current ? this.swiperRef.current.swiper.realIndex : null;

			return (
                <div 
                    id={`swiper-slide-${i}`} 
                    key={i} 
                    style={{ 
                        height: 200, 
                        width: 200 
                    }}
                >
                    <img 
                        style={
                            selectedIndex === i 
                            && this.state.touched 
                            ? {border: '7px solid #fafafa'} 
                            : {boxShadow: '5px 5px 20px'}
                        } 
                        className="ui image" 
                        src={video.snippet.thumbnails.medium.url} 
                        alt={video.snippet.title} 
                        onClick={_ => this._onClick(i)}
                    />
				</div>
			);
		});
	}

	render() {
        const params = {
            spaceBetween: 30,
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: window.innerWidth < 400 ? 2 : 7,
			keyboard: true
	    }
		return (
			<Swiper ref={this.swiperRef} {...params} shouldSwiperUpdate >
				{this.renderList()}
			</Swiper>	
		);
	}
}


export default Slider;
