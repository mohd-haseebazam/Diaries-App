import React, { ReactElement, Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Entries.css";
import { RootState } from "../store/rootReducer";
import EntryModal from "./EntryModal";
import { Diary } from "../interface";
import { getEntries, clear_entries } from "../features/entry/entrySlice";
import EntryItem from "./Entry";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";



interface Props {}
// eslint-disable-next-line
function Entries({}: Props): ReactElement {
  const { diaries } = useSelector((state: RootState) => state.diary);
  const { entries } = useSelector((state: RootState) => state.entry);
  const [diary, setDiary] = useState<Diary | null>();
  const [notfoundStatus, setStatus] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(clear_entries());
    const filterDiary = diaries.filter((diary) => diary.id === id);
    filterDiary ? setDiary(filterDiary[0]) : setStatus(true);
    filterDiary &&
      filterDiary[0]?.id &&
      dispatch(getEntries(filterDiary[0]?.id));
    // eslint-disable-next-line
  }, [diary]);

  if (!diary && notfoundStatus) return <div>Not Found</div>;
  else if (!diary && !notfoundStatus) return <div>Loading ...</div>;

  return (
    <Fragment>
      <section className="body__area">
        <div className="button_area">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/">
              Click here to see Entries
            </Link>
          </Breadcrumbs>
          {diary && (
            <EntryModal
              btnTitle={"Click here to Edit Entry"}
              mode={"add"}
              diary_id={diary.id}
              id={""}
              editInfo={{ title: "", content: "" }}
            />
          )}
        </div>
        <div className="entryCards">
          {entries.length > 0 &&
            entries.map((entry) => <EntryItem entry={entry} key={entry?.id} />)}
        </div>
      </section>
    </Fragment>
  );
}

export default Entries;
