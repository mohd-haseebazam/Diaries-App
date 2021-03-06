import React, { ReactElement, Fragment, useEffect } from 'react'
import "./Home.css";
import Diary from './Diary';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { getDiaries } from '../features/diary/diarySlice';
import DiaryModal from './DiaryModal';


interface Props {

}
// eslint-disable-next-line
function Home({}: Props): ReactElement {

    const { diaries } = useSelector((state: RootState) => state.diary);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        user && user?.id && dispatch(getDiaries(user?.id));
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <Fragment>
            <section className="">
                    <h1>Diaries</h1>
                <div className="create-new-button">
                    <DiaryModal btnTitle={'Create New Diary'} title={'Create Diary'} id={""} mode={'add'} editInfo={{ title: "", type: "private" }} />
                </div>
                <div className="diaryCards">
                    {
                        diaries.length > 0 &&
                        diaries.map(diary => (
                            <Diary title={diary?.title} id={diary?.id} key={diary?.id} type={diary?.type} />
                        ))
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Home