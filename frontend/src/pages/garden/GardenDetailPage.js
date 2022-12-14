import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import GardenUpdateModal from '../../components/garden/GardenUpdateModal';
import GardenDiaryCreateModal from '../../components/garden/GardenDiaryCreateModal';
import GardenDiaryModal from '../../components/garden/GardenDiaryModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteGarden,
  fetchMyGarden,
} from '../../features/garden/gardenActions';
import {
  Wrapper,
  GardenDetailImage,
  GardenDetailDescription,
  GardenDetailInfo,
} from '../../styles/garden/GardenDetailStyle';
import { useParams } from 'react-router-dom';
import GardenDiaryList from '../../components/garden/GardenDiaryList';

const GardenDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gardenId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [diaryCreateOpen, setDiaryCreateOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    dispatch(fetchMyGarden(gardenId));
    console.log(gardenId);
  }, [dispatch, gardenId]);

  const { gardenPlant, loading } = useSelector((state) => state.garden);
  const {
    plant,
    date_grow,
    memo,
    recent_water,
    preference,
    watering_schedule,
    img_url,
  } = gardenPlant;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openCreateDiary = () => {
    setDiaryCreateOpen(true);
  };

  const closeCreateDiary = () => {
    setDiaryCreateOpen(false);
  };

  const deleteHandler = () => {
    dispatch(deleteGarden(gardenPlant?.id)).then(() => {
      navigate(-1);
      dispatch(fetchMyGarden(gardenId));
    });
  };

  return (
    <>
      {Object.keys(gardenPlant).length && (
        <GardenUpdateModal
          modalOpen={modalOpen}
          closeModal={closeModal}
          gardenPlant={gardenPlant}
        />
      )}
      <GardenDiaryCreateModal
        modalOpen={diaryCreateOpen}
        closeModal={closeCreateDiary}
      />
      <GardenDiaryModal />

      <Container>
        {!loading && (
          <>
            <Wrapper>
              <div className="button-div">
                <button onClick={openCreateDiary} className="create-button">
                  ?????? ??????
                </button>
                <button onClick={openModal} className="update-button">
                  ?????? ??????
                </button>
                <button onClick={deleteHandler} className="delete-button">
                  ?????? ??????
                </button>
              </div>
              <div className="header">
                <GardenDetailImage src={img_url} />
                <GardenDetailDescription>
                  <div className="garden-header">
                    <div className="garden-title">???? {plant?.plant_name}</div>
                    <button
                      className="detail-btn"
                      onClick={() => navigate(`/dictionary/${plant.id}`)}
                    >
                      ???? ?????? ??????
                    </button>
                    <div className="grow-date">
                      {date_grow?.substr(0, 4)}??? {date_grow?.substr(5, 2)}???{' '}
                      {date_grow?.substr(8, 2)}?????? ?????? ?????????
                    </div>
                  </div>
                  <div className="garden-content">{memo}</div>
                  <div className="garden-detail-info">
                    <GardenDetailInfo>
                      <p>????</p>
                      <p className="info-title">??? ?????? ??????</p>
                      <p>{watering_schedule}???</p>
                    </GardenDetailInfo>
                    <GardenDetailInfo>
                      <div className="garden-detail-recent_water">
                        <p>????</p>
                        <p className="info-title">?????? ??? ??? ???</p>
                        <p>
                          {recent_water?.substr(5, 2)}???{' '}
                          {recent_water?.substr(8, 2)}???
                        </p>
                      </div>
                    </GardenDetailInfo>
                    <GardenDetailInfo>
                      <p>???</p>
                      <p className="info-title">?????? ??????</p>
                      <p>{preference}???</p>
                    </GardenDetailInfo>
                  </div>
                </GardenDetailDescription>
              </div>
            </Wrapper>
            <GardenDiaryList />
          </>
        )}
      </Container>
    </>
  );
};

export default GardenDetailPage;
