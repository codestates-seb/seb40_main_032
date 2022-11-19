import { useState } from 'react';
import styled from 'styled-components';
import { BsCamera } from 'react-icons/bs';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .uploader__container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;
  }

  .uploader__default {
    display: flex;
    width: 10rem;
    height: 10rem;
    border: 2px dashed var(--holder-base-color);
    border-radius: 1rem;
  }

  .uploader__preview {
    background-size: cover;
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    margin-right: 1.5rem;
  }

  .upload__button--wrapper {
    width: 10rem;
    border-radius: 1rem;
    border: 2px dashed var(--holder-base-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #upload__button {
    display: none;
    width: 10rem;
    height: 10rem;
    border: 2px dashed var(--holder-base-color);
    border-radius: 10px;
  }
`;

const CameraIcon = styled(BsCamera)`
  color: var(--holder-base-color);
  font-size: 3rem;
`;

function PublishPhoto() {
  const [photos, setPhotos] = useState([]);

  // 미리보기 사진 띄우기 - 클라이언트 메모리로 처리
  const uploadPhotos = async event => {
    const uploaded = [...photos];
    const targetFiles = [...event.target.files]; // 등록 사진
    targetFiles.map(obj => {
      return uploaded.push(URL.createObjectURL(obj)); // Blob 객체를 URL로 바꾸어 img src로 mapping
    });
    setPhotos(uploaded);
  };

  return (
    <Container>
      <div className="uploader__container">
        {photos.length === 0 ? (
          <div className="uploader__default" />
        ) : (
          <div>
            {photos.map(url => (
              <img src={url} alt="photos" className="uploader__preview" />
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
