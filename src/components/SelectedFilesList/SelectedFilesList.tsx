/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FileUploaderItem } from '@carbon/react';
import { SyntheticEvent, useEffect, useState } from 'react';
import classes from './SelectedFilesList.module.scss';
import { FileEntity } from '@/app/api/files/types';
import { UploadFileValue } from '../UploadDataset/UploadDataset';

interface Props {
  existingFiles?: FileEntity[];
  uploadFiles: UploadFileValue[];
  disabled?: boolean;
  onRemoveExistingFile?: (id: string) => void;
  onRemoveUploadFile: (id: string) => void;
}

export function SelectedFilesList({
  existingFiles = [],
  uploadFiles,
  disabled,
  onRemoveUploadFile,
  onRemoveExistingFile,
}: Props) {
  return (
    <fieldset className={classes.root} disabled={disabled}>
      {existingFiles.map((uploadedFile: FileEntity) => {
        return (
          <FileUploaderItem
            name={uploadedFile.filename}
            uuid={uploadedFile.id}
            key={uploadedFile.id}
            status="edit"
            onDelete={() => onRemoveExistingFile?.(uploadedFile.id)}
          />
        );
      })}
      {uploadFiles.map((value: UploadFileValue) => (
        <UploadFileItem
          key={value.id}
          value={value}
          onDelete={onRemoveUploadFile}
        />
      ))}
    </fieldset>
  );
}

interface UploadFileItemProps {
  value: UploadFileValue;
  onDelete: (fileId: string) => void;
}

function UploadFileItem({ value, onDelete }: UploadFileItemProps) {
  const [state, setState] = useState(() => value.getState());
  useEffect(() => value.registerStateChangeListener(setState), [value]);

  let iconDescription = 'Remove file';
  if (state.status === 'uploading') {
    iconDescription = 'Uploading';
  } else if (state.status === 'complete') {
    iconDescription = 'Upload complete';
  }

  return (
    <FileUploaderItem
      name={value.file.name}
      uuid={value.id}
      iconDescription={iconDescription}
      {...state}
      onDelete={(
        _e: SyntheticEvent<HTMLElement, Event>,
        { uuid }: { uuid: string },
      ) => {
        onDelete(uuid);
      }}
    />
  );
}
