import './Song.scss'
import { setCurrentSong, setCurrentList } from '../../store/features/action/actionSlice';
import { authorityService } from '../../servives/userService';
import { showTypeToastify } from '../../servives/toastifyService';
import { useDispatch, useSelector } from 'react-redux';
import SongItem from './SongItem/SongItem';

const Song = (props) => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handlePlaySong = async (item) => {
        const data = await authorityService(item.id, user.id)
        if(data.errorCode) {
            dispatch(setCurrentSong(item));
        }
        else showTypeToastify(data.message, "warning")
        if(props.isPlaylist) dispatch(setCurrentList(props.array));
        else dispatch(setCurrentList([item]));
    }
    return (
        <>
        <div className='song-list'>
            <table>
                <thead className='header-list heigth bd-bottom'>
                    <tr>
                        <th>Song</th>
                        <th className='text-center'>Classify</th>
                        <th className='text-center'>Time</th>
                        <th className='text-right'></th>
                    </tr>
                </thead>
                <tbody className='body-list'>
                    {!props.loading && props.array.map((item, index)=>{
                        return (
                            <SongItem key={item.id} item={item} option={props.option} isPlaylist={props.isPlaylist} icon={props.icon}
                                 handlePlaySong={handlePlaySong} playlistId={props.playlistId} handleRemoveItem={props.handleRemoveItem} />
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Song