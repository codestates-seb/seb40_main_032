import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsCamera } from 'react-icons/bs';
import uuid from 'react-uuid';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import postPhotoApi from '../../api/postPhotoApi';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .uploader__container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;
    > div {
      display: flex;
    }
  }

  .uploader__default {
    display: flex;
    width: 10rem;
    height: 10rem;
    border: 2px dashed var(--holder-base-color);
    border-radius: 1rem;
  }

  #uploader__preview {
    position: relative;
  }

  .uploader__preview {
    background-size: cover;
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
  }

  .remove__button {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: var(--font-semi-bold);
  }

  .upload__button--wrapper {
    width: 10rem;
    border-radius: 1rem;
    border: 2px dashed var(--holder-base-color);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  #upload__button {
    display: none;
    width: 10rem;
    height: 10rem;
    border: 2px dashed var(--holder-base-color);
    border-radius: 10px;
  }

  @media screen and (max-width: 549px) {
    width: 100%;
    justify-content: space-between;
    .uploader__default,
    .upload__button--wrapper {
      width: 10rem;
      height: 10rem;
    }
    .uploader__preview {
      margin-right: 0;
    }
  }
`;

const CameraIcon = styled(BsCamera)`
  color: var(--holder-base-color);
  font-size: 3rem;
`;

const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1.5rem;
  &:hover {
    color: red;
  }
`;

function PublishPhoto({ setPhotoUrl }) {
  const [photos, setPhotos] = useState([]);
  const [blobPhotos, setBlobPhotos] = useState();

  // 미리보기 사진 띄우기 - 클라이언트 메모리로 처리
  const uploadPhotos = async event => {
    const uploaded = [...photos];
    setBlobPhotos(...event.target.files);
    const targetFiles = [...event.target.files]; // 등록 사진
    targetFiles.map(obj => {
      return uploaded.push(URL.createObjectURL(obj)); // Blob 객체를 임시 URL로 바꾸어 img src로 mapping
    });
    setPhotos(uploaded);
  };

  // 사진 개별 삭제
  const removePhotos = indexRemove => {
    URL.revokeObjectURL(photos[indexRemove]);
    setPhotos([...photos.filter((_, index) => index !== indexRemove)]); // 미리보기에서 삭제
  };

  /* eslint-disable */
  const handleClick = event => {
    event.target.value = ''; // 동일한 사진을 여러번 올릴수 있게 해줌
  };

  // blob에 사진 추가 시 사진 post 요청
  useEffect(() => {
    const formData = new FormData();
    if (blobPhotos) {
      formData.append(`images`, blobPhotos, `${blobPhotos.name}`);
    }
    try {
      if (blobPhotos) {
        postPhotoApi(formData).then(res => setPhotoUrl(...res.data.imagePaths));
      }
    } catch (err) {
      console.log(err);
    }
  }, [blobPhotos]);

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      return URL.revokeObjectURL(photos);
      // 페이지 전환시 URL이 메모리에 남지 않도록 전부 폐기
    };
  }, []);

  return (
    <Container>
      <div className="uploader__container">
        {photos.length === 0 ? (
          <div className="uploader__default" />
        ) : (
          <div>
            {photos.map((url, index) => (
              <div id="uploader__preview" key={uuid()}>
                <img src={url} alt="photos" className="uploader__preview" />
                <RemoveIcon
                  className="remove__button"
                  onClick={() => removePhotos(index)}
                />
              </div>
            ))}
          </div>
        )}
        <div
          className="upload__button--wrapper"
          style={{ display: photos.length === 5 ? 'none' : 'block' }}
        >
          <div>
            <label htmlFor="upload__button">
              <CameraIcon />
            </label>
            <input
              id="upload__button"
              type="file"
              onChange={uploadPhotos}
              onClick={handleClick}
              accept="image/jpg, image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
      <div>
        <span className="footer">
          업로드 가능한 파일 포맷은 jpg, jpeg, png입니다.
        </span>
      </div>
    </Container>
  );
}

export default PublishPhoto;
