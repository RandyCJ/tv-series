import React, { Component } from 'react'
import series from './series.json'
//import listReactFiles from 'list-react-files'

export default class Series extends Component {

    state = {
        series: series,
        images: []
    }

    componentDidMount = () => {
        const imagesPath = "/series-posters/"
        const paths = this.state.series.map(serie => {
            // let image = {
            //     id: serie.id,
            //     path: imagesPath + serie.id.toString() + "/1.png"
            // }
            return [serie.id, imagesPath + serie.id.toString() + '/1.png']
        })

        this.setState({images: paths})
    }

    render() {
        console.log(this.state.images)
        return (
            this.state.series.map(serie => {
                let imagePath = ''
                for (let img of this.state.images){
                    if (img[0] === serie.id) {
                        imagePath = img[1]
                        break
                    }
                }
                return <img width='200' alt="" src={imagePath} key={serie.id}/>
            })
        )
    }
}
