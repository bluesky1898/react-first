import React, {Component, PropTypes} from 'react';

import SliderSlick from 'react-slick';

class Slider extends Component {
  
  constructor(props) {
    super(props);
    this.slider = null;
    this.timer = null;
  }

  componentDidMount() {
    this.autoPlay();
  }

  autoPlay() {
    // if (this.timer) {
    //   clearInterval(this.timer);
    // }
    // let slider = this.slider;
    // this.timer = setInterval(() =>  {
    //   slider.slickNext();
    //   console.log('slide again ');
    // }, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {sliders} = this.props;
    if (sliders.length <= 0) return null;
    return (
      <div className="slider-con">
        <div className="inner">
          <SliderSlick ref={c => this.slider = c} {...this.props.settings}>
            {sliders.map( (slider, index) => {
              return <div key={index}><img src={slider} /></div>
            })}
          </SliderSlick>
        </div>
      </div>
    );
  }
};

Slider.propTypes = {
  settings: PropTypes.object.isRequired,
  sliders: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]) 
};
Slider.defaultProps = {
  settings: {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: false,
    prevArrow: false,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    adaptiveHeight: false,
    lazyLoad: false,
    swipe: true,
    dots : true,
    dotsClass : "banner_dots"
  },
};

export default Slider;