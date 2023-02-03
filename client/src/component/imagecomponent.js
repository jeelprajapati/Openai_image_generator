import { Component } from "react";
class ImageComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            <img src={this.props.url} alt="display image"/>
            </>
        )
    }
}
export default ImageComponent;