import './AddSong.scss'

import AddSongForm from '../AddSongForm/AddSongForm'
import { useState } from 'react'
import { addSongToLib } from '../../../servives/songService'
import { showTypeToastify } from '../../../servives/toastifyService';
import { useDispatch } from 'react-redux';
import { getSongs } from '../../../store/features/songs/songSlice';
import { useNavigate } from 'react-router-dom';

const AddSong = () => {
    const initialSongInput = {
        name: "",
        actor: "",
        src: "",
        image: "",
        video: "",
        songcategoryid: 1
    }
    const [firstSong, setFirstSong] = useState(initialSongInput)
    const [secondSong, setSecondSong] = useState(initialSongInput)
    const [thirdSong, setThirdSong] = useState(initialSongInput)
    const [forthSong, setForthSong] = useState(initialSongInput)
    const [fifthSong, setFifthSong] = useState(initialSongInput)
    const [cnt, setCnt] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleAddSongToLib = async () => {
        let song = [firstSong]
        if(cnt === 2) {
            song = [firstSong, secondSong]
        }
        else if(cnt === 3) {
            song = [firstSong, secondSong, thirdSong]
        }
        else if(cnt === 4) {
            song = [firstSong, secondSong, thirdSong, forthSong]
        }
        else if(cnt === 5) {
            song = [firstSong, secondSong, thirdSong, forthSong, fifthSong]
        }
        const response = await addSongToLib(song)
        if(response.errorCode) {
            showTypeToastify(response.message, "success")
            dispatch(getSongs())
            navigate('/Library/Song')
        }
        else {
            showTypeToastify("something wrong!", "warning")
            navigate('/')
        }
    }

    const handleAddInput = () => {
        setCnt(cnt => ++cnt)
    }
    return (
        <div className="component-container">
            <div className="my-container">
                <div>
                    <h1>Add song to library</h1>
                </div>
                <div className='add-song-content'>
                    <AddSongForm key={1} title={'First song'} initialSongInput={initialSongInput} song={firstSong} setSong={setFirstSong} close={0} />
                    {cnt>=2 && <AddSongForm key={2} title={'Second song'} initialSongInput={initialSongInput} song={secondSong} setSong={setSecondSong} close={1} setCnt={setCnt} />}
                    {cnt>=3 && <AddSongForm key={3} title={'Third song'} initialSongInput={initialSongInput} song={thirdSong} setSong={setThirdSong} close={1} setCnt={setCnt} />}
                    {cnt>=4 && <AddSongForm key={4} title={'Forth song'} initialSongInput={initialSongInput} song={forthSong} setSong={setForthSong} close={1} setCnt={setCnt} />}
                    {cnt>=5 && <AddSongForm key={5} title={'Fifth song'} initialSongInput={initialSongInput} song={fifthSong} setSong={setFifthSong} close={1} setCnt={setCnt} />}
                    <div className='d-flex mt-3'>
                        <button className='btn-add me-3' onClick={() => handleAddSongToLib()}>Add to lib</button>
                        {cnt<5 && <button className='btn-add' onClick={()=>handleAddInput()}>Add input</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSong