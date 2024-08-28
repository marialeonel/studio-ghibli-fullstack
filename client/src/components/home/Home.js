import Display from "../display/Display";
import Header from "../header/Header";
import './Home.css'
import ImageRender from "../image-render/ImageRender";

function Home(){
    return (
       <div  style={{ height: '100vh', overflowY: 'auto' }}>
        <Header></Header>
        <ImageRender></ImageRender>
        <Display></Display>
       </div>
            
        
        
    );
}

export default Home;