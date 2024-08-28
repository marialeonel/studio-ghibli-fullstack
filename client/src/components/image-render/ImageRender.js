import Image from 'react-bootstrap/Image'; 

function ImageRender() {
  return (
    <div>
        <Image  src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1280px-Studio_Ghibli_logo.svg.png" fluid className="mx-auto d-block" style={{ height: '200px' }}/>
    </div>
    
  );
}

export default ImageRender;