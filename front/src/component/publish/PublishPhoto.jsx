import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { BsCamera } from 'react-icons/bs';
import uuid from 'react-uuid';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import postPhotoApi from '../../api/postPhotoApi';

const Container = styled.section`
  display: flex;
  flex-direction: column;

  .uploader__container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    > div {
      display: flex;
    }
  }

  #uploader__preview {
    flex-wrap: wrap;
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
    height: 10rem;
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
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  #upload__button {
    display: none;
    width: 10rem;
    height: 10rem;
    border: 2px dashed var(--holder-base-color);
    border-radius: 10px;
  }

  .message__error {
    color: red;
  }

  @media screen and (max-width: 549px) {
    width: 100%;
    justify-content: space-between;
    .uploader__preview {
      margin-right: 0;
    }
  }
`;

const CameraIcon = styled(BsCamera)`
  color: var(--holder-base-color);
  font-size: 3.5rem;
  cursor: pointer;
  opacity: 0.8;
  @keyframes scaler {
    25% {
      font-size: 3.25rem;
    }
    50% {
      font-size: 3rem;
    }
    75% {
      font-size: 3.25rem;
    }
  }
  &:hover {
    animation: scaler 1s linear infinite;
    opacity: 1;
  }
`;

const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1.5rem;
  &:hover {
    color: red;
  }
`;

const PublishPhoto = forwardRef(({ setPhotoUrl, deleteImages }, ref) => {
  const [photos, setPhotos] = useState([]);
  const [blobPhotos, setBlobPhotos] = useState();

  const [errorMessage, setErrorMessage] = useState('');

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

  const validatePhotos = event => {
    const targetFileSize = event.target.files[0].size; // 업로드 사진 크기 (단위:bytes)
    const targetFileSizeToMb = targetFileSize / (1024 * 1024); // bytes=>megabyte 변환
    const targetFileSizeToKb = targetFileSize / 1024; // b=>kilobyte 변환
    const MAX_SIZE_MB = 10; // 최대 10mb <= 이 부분을 설정하시면 됩니다.
    const MIN_SIZE_KB = 0; // 최소 0kb

    if (targetFileSizeToMb > MAX_SIZE_MB) {
      setErrorMessage(`사진 1장당 최대 ${MAX_SIZE_MB}MB까지 등록 가능합니다.`);
    } else if (targetFileSizeToKb < MIN_SIZE_KB) {
      setErrorMessage(`최소 업로드 크기는 ${MIN_SIZE_KB}KB 입니다.`);
    } else {
      setErrorMessage('');
      uploadPhotos(event); // 조건 통과시 상단의 미리보기 업로드 함수 실행
    }
  };

  const typeCheck = event => {
    const targetFileType = event.target.files[0].type; // 업로드 파일 유형
    const targetFileTypeShort = targetFileType.slice(
      targetFileType.indexOf('/') + 1,
      targetFileType.length,
    ); // 확장자명 text추출
    const onlyAccept = ['image/jpeg', 'image/png', 'image/jpg']; // 허용할 확장자명 설정
    if (onlyAccept.indexOf(targetFileType) === -1) {
      setErrorMessage(`${targetFileTypeShort} 형식은 업로드 할 수 없습니다.`);
    } else validatePhotos(event);
  };

  // 수정페이지 진입시 미리보기 불러오는 함수
  const preview = data => {
    return data.map(el => photos.push(el));
  };
  useImperativeHandle(ref, () => ({ preview }));

  // 사진 개별 삭제
  const removePhotos = indexRemove => {
    URL.revokeObjectURL(photos[indexRemove]);
    setPhotos([...photos.filter((_, index) => index !== indexRemove)]); // 미리보기에서 삭제
    deleteImages(indexRemove); // Formdata에서 삭제
    setErrorMessage('');
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
        {photos.length === 0 ? null : (
          <>
            {photos.map((url, index) => (
              <div id="uploader__preview" key={uuid()}>
                <img src={url} alt="photos" className="uploader__preview" />
                <RemoveIcon
                  className="remove__button"
                  onClick={() => removePhotos(index)}
                />
              </div>
            ))}
          </>
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
              onChange={typeCheck}
              onClick={handleClick}
              accept="image/jpg, image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
      <div>
        {!errorMessage.length ? null : (
          <div className="message__error">{errorMessage}</div>
        )}
      </div>
      <div className="message">
        <span>
          사진은 최대 5개까지 등록할 수 있으며, 지원하는 파일 형식은 jpg, jpeg,
          png입니다.
        </span>
      </div>
    </Container>
  );
});

export default PublishPhoto;
