import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { BsCamera, BsPerson } from 'react-icons/bs';
import postPhotoApi from '../../api/postPhotoApi';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionProfile = styled.div`
  position: relative;
  text-align: center;
  margin: 0 6rem;
  margin-bottom: 9rem;
  @media screen and (max-width: 549px) {
    margin-bottom: 5rem;
  }
`;

const ProfileStyle = css`
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid var(--holder-base-color);
  border-radius: 50%;
`;

const ProfileDefault = styled.div`
  ${ProfileStyle}
`;

const ProfilePreview = styled.img`
  ${ProfileStyle}
  border:0.5px solid var(--holder-base-color);
  object-fit: cover;
`;

const ProfileEdit = styled.label`
  ${ProfileStyle}
  position:absolute;
  bottom: 0;
  right: 0;
  width: 4.5rem;
  height: 4.5rem;
  background-color: var(--base-white-color);
  &:hover {
    background-color: var(--font-base-grey);
    transition: 0.2s all ease-in-out;
  }
  &:active {
    scale: calc(0.9);
  }
`;

const CameraIcon = styled(BsCamera)`
  font-size: 2.5rem;
  color: var(--holder-base-color);
`;

const AvatarIcon = styled(BsPerson)`
  width: 5rem;
  height: 5rem;
  color: var(--holder-base-color);
`;

const ProfileHidden = styled.input`
  display: none;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 5px;
`;

function MyInfoEditProfile({ formData, setFormData }) {
  const [blob, setBlob] = useState(); // 이미지
  const [previewUrl, setPreviewUrl] = useState(); // 미리보기 url 주소
  const [resURL, setResURL] = useState(''); // 서버 저장 url 주소
  const [errorMessage, setErrorMessage] = useState(''); // 용량 제한 메시지

  const uploadImage = async event => {
    setBlob(...event.target.files); // 이미지 등록
  };

  const validatePhotos = event => {
    const targetFileSize = event.target.files[0].size; // 업로드 사진 크기 (단위:bytes)
    const targetFileSizeToMb = targetFileSize / (1024 * 1024); // bytes=>megabyte 변환
    const targetFileSizeToKb = targetFileSize / 1024; // b=>kilobyte 변환
    const MAX_SIZE_MB = 3; // 최대 3mb
    const MIN_SIZE_KB = 0; // 최소 0kb

    if (targetFileSizeToMb > MAX_SIZE_MB) {
      setErrorMessage(`${MAX_SIZE_MB}MB 미만의 사진을 업로드하세요.`);
    } else if (targetFileSizeToKb < MIN_SIZE_KB) {
      setErrorMessage(`최소 업로드 크기는 ${MIN_SIZE_KB}KB 입니다.`);
    } else {
      setErrorMessage('');
      uploadImage(event); // 조건 통과시 상단의 미리보기 업로드 함수 실행
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
      setErrorMessage(`${targetFileTypeShort} 형식은 업로드할 수 없습니다.`);
    } else validatePhotos(event);
  };

  // 미리보기 렌더링
  useEffect(() => {
    const reader = new FileReader();
    if (blob) {
      reader.readAsDataURL(blob);
      reader.onload = event => {
        setPreviewUrl(event.target.result);
      };
    }
  }, [blob]);

  // 이미지 서버 전송
  useEffect(() => {
    const blobFormData = new FormData();
    if (blob) {
      blobFormData.append('images', blob);
    }
    try {
      if (blob) {
        postPhotoApi(blobFormData).then(res => {
          setResURL(...res.data.imagePaths);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [blob]);

  /* eslint-disable */
  const handleClick = event => {
    event.target.value = ''; // 동일한 사진을 여러번 올릴수 있게 해줌
  };

  useEffect(() => {
    setFormData({ ...formData, profile: resURL });
  }, [resURL]);

  return (
    <Wrapper>
      {!errorMessage.length ? null : <ErrorMsg>{errorMessage}</ErrorMsg>}
      <SectionProfile>
        <ProfileHidden
          type="file"
          id="profile"
          name="profile"
          onChange={typeCheck}
          onClick={handleClick}
          accept="image/png, image/jpg, image/jpeg"
        />
        {previewUrl ? (
          <ProfilePreview src={previewUrl} alt="preview" />
        ) : (
          <ProfileDefault>
            <AvatarIcon />
          </ProfileDefault>
        )}
        <ProfileEdit htmlFor="profile">
          <CameraIcon />
        </ProfileEdit>
      </SectionProfile>
    </Wrapper>
  );
}

export default MyInfoEditProfile;
