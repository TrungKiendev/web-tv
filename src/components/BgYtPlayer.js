// background youtube video player component
import React, { Component, createRef } from 'react';
import YouTube from 'react-youtube';

import './BgYtPlayer.scss';

class BgYtPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            window: {
                height: window.innerHeight,
                width: window.innerWidth
            },
            visible: false
        };
        this.playerRef = createRef();
    }

    _onReady = (event) => {
        setTimeout(() => {
            this.setState({
                visible: true
            });
            event.target.playVideo();
        }, 1000);
      }
      
    _onEnd(event) {
        event.target.playVideo();
    }

    _onPlay(event) { //for development to save youtube quota, stops autoplay
        if(process.env.NODE_ENV !== "production") {
            event.target.pauseVideo();
        }  
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.resize);
    }

    resize = () => {
        
        if(this.state.window.width !== window.innerWidth ||
            this.state.window.height !== window.innerHeight) {
                this.setState({
                    window: {
                        height: window.innerHeight,
                        width: window.innerWidth
                    }
                });          
        }
    }

    render() {
        const videoOptions = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
              controls: 0,
              rel: 0,
              showinfo: 0,
              loop: 1
            }
        };
        const { visible } = this.state;
        
        if (!this.props.video) return (
            <div className="no-video">
                <p>search and select a video...</p>
            </div>
        ); 

        const currentVid = this.props.video;
        return (
            <div className="video-background">
                <div className="video-foreground">
                    <YouTube
                        ref={this.playerRef}
                        videoId={currentVid.id.videoId}
                        opts={videoOptions}
                        className="video-iframe"
                        onReady={this._onReady}
                        onEnd={this._onEnd}
                        onPlay={this._onPlay}
                        style={{
                            visible: `${visible ? 'visible' : 'hidden'}`
                        }}
                    />
                </div>
            </div>
        );        
    }
}

export default BgYtPlayer;