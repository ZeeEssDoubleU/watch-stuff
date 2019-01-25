import React, { Component} from 'react';

import VideoPreview from '../VideoPreview/VideoPreview.js';
import './Home.scss';

class Home extends Component {
   render() {
      return (
         <div className="home">
            <VideoPreview />
         </div>
      );
   }
}

export default Home;