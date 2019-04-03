import { useRef } from 'react';

interface Props {
  onChange: (files: FileList | null) => void;
}

export const UploadPhotoButton = (props: Props) => {
  const fileInput = useRef(null);

  return (
    <div>
      <label style={styles.label}>
        Upload Photo
        <input
          ref={fileInput}
          type="file"
          style={styles.input as any}
          onChange={event => props.onChange(event.target.files)}
        />
      </label>
    </div>
  );
};

const styles = {
  input: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  label: {
    color: 'white',
    backgroundColor: 'pink',
    fontFamily: 'system-ui',
    padding: 10,
    display: 'flex',
    borderRadius: 10
  }
};
