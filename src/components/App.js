import React, { useState } from 'react';
import SearchBar from './SearchBar';
import useVideos from '../hooks/useVideos';
import BgYtPlayer from './BgYtPlayer';
import Slider from './Slider';

import './App.scss';

const App = () => {
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [videos, search] = useVideos('');

	return (
		<div className="page">
			<div className="ui container" style={{ marginTop: '10px'}}>
					<BgYtPlayer video={selectedVideo} />
					<div>
						<div style={{marginTop: '15%'}}>
							<SearchBar onSubmit={search}/>	
						</div>
						<Slider slides={videos} onVideoSelect={setSelectedVideo}/>
					</div>
			</div>
		</div>
	);

}

export default App;
