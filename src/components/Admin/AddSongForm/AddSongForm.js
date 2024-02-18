import './AddSongForm.scss'
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const AddSongForm = (props) => {
    const [name, setName] = useState('')
    const [actor, setActor] = useState('')
    const [audio, setAudio] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [category, setCategory] = useState(1)
    const handleCloseInput = () => {
        props.setCnt(cnt => --cnt)
        props.setSong(props.initialSongInput)
    }
    useEffect(() => {
        props.setSong({
            name: name,
            actor: actor,
            src: audio,
            image: image,
            video: video.length === 0 ? null : video,
            SongCategoryId: parseInt(category)
        })
    }, [name, actor, audio, image, video, category])
    return (
        <Form className="form-container">
            <fieldset>
                <legend>{props.title}</legend>
                {props.close === 1 && (
                    <div className='close-icon' onClick={() => handleCloseInput()}><FontAwesomeIcon icon={faTimes} /></div>
                )}
                <Form.Group className="ps-3 pb-3 pe-3">
                    <Form.Group className="row mt-3">
                        <Form.Group className="col-6">
                            <Form.Label className="">Name</Form.Label>
                            <Form.Control
                                className="form-color text-white"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label className="">Actor</Form.Label>
                            <Form.Control
                                className="form-color text-white"
                                type="text"
                                placeholder="Actor"
                                name="actor"
                                value={actor}
                                onChange={(e)=>setActor(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="row mt-3">
                        <Form.Group className="col-6">
                            <Form.Label className="">Audio src</Form.Label>
                            <Form.Control
                                className="form-color text-white"
                                type="text"
                                placeholder="Audio src"
                                name="src"
                                value={audio}
                                onChange={(e)=>setAudio(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label className="">Image src</Form.Label>
                            <Form.Control
                                className="form-color text-white"
                                type="text"
                                placeholder="Image src"
                                name="image"
                                value={image}
                                onChange={(e)=>setImage(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="row mt-3">
                        <Form.Group className="col-6">
                            <Form.Label className="">Video src</Form.Label>
                            <Form.Control
                                className="form-color text-white"
                                type="text"
                                placeholder="Video src"
                                name="video"
                                value={video}
                                onChange={(e)=>setVideo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label className="">Actor</Form.Label>
                            <Form.Select 
                                name='category' className="form-color text-white"
                                onChange={(e)=>setCategory(e.target.value)}
                                aria-label="Default select example" 
                                defaultValue={category}
                            >
                                <option value="1">BASIC</option>
                                <option value="2">PREMIUM</option>
                            </Form.Select>
                        </Form.Group>
                    </Form.Group>
                </Form.Group>
            </fieldset>
        </Form>
    )
}

export default AddSongForm