'use client';

import React, { FC, useCallback, useRef, useState } from 'react';
import { useDropzone, FileRejection, DropEvent, Accept } from 'react-dropzone';
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRandomId } from '@/hooks/use-random-id';
import {
  fileInputContainerStyles,
  fileInputHintStyles,
  fileInputIconStyles,
  fileInputInputTextStyles,
  fileInputLabelStyles,
} from '@/styles/components/file-input.styles';
import { twMerge } from 'tailwind-merge';
import { formatBytes } from '@/lib/helpers/format-bytes';

type OnDropHandler = (
  acceptedFiles: File[],
  rejectedFiles: FileRejection[],
  event: DropEvent
) => void;

export type OnAddHandler = (files: File[]) => void;
export type OnRemoveHandler = (file: File) => void;

export interface FileInputProps {
  files: File[];
  onAdd: OnAddHandler;
  onRemove: OnRemoveHandler;
  id?: string;
  label?: string;
  inputText?: string;
  maxSize?: number;
  maxFiles?: number;
  hint?: string;
  accept?: Accept;
  name?: string;
  disabled?: boolean;
  noDrag?: boolean;
  noClick?: boolean;
}

export const FileInput: FC<FileInputProps> = ({
  files,
  label = 'Upload',
  inputText = 'Select File(s)',
  id,
  maxSize,
  maxFiles,
  hint = '',
  accept,
  name,
  disabled,
  noDrag,
  noClick,
  onAdd,
  onRemove,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const randomIdPrefix = useRef('file-input');
  const inputId = useRandomId(randomIdPrefix.current);
  const randomName = useRandomId(randomIdPrefix.current);
  const inputRef = useRef<HTMLInputElement>(null);

  const _onDrop = useCallback<OnDropHandler>(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        setErrorMessage(rejectedFiles[0].errors[0].message);
        return;
      }
      setErrorMessage('');
      onAdd(acceptedFiles);
    },
    [onAdd]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: _onDrop,
    maxFiles,
    maxSize,
    accept,
    noDrag,
    noClick,
    disabled,
  });

  return (
    <div>
      <p className={fileInputLabelStyles({ disabled })}>{label}</p>
      <div
        className={twMerge(
          fileInputContainerStyles({ active: isDragActive, disabled, noClick })
        )}
        {...getRootProps()}
      >
        <div className="text-center w-full">
          <PaperClipIcon
            className={fileInputIconStyles({ disabled })}
            aria-hidden="true"
          />
          <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
            <label
              htmlFor={id ?? inputId}
              className={fileInputInputTextStyles({ disabled })}
            >
              <span>{inputText}</span>
              <input
                ref={inputRef}
                id={id ?? inputId}
                type="file"
                className="sr-only"
                name={name ?? randomName}
                disabled={disabled}
                {...getInputProps()}
              />
            </label>
            {!noDrag && (
              <p
                className={`pl-1 ${disabled ? 'text-white/10 pointer-events-none' : ''}`}
              >
                or drag and drop
              </p>
            )}
          </div>
          <p className={fileInputHintStyles({ disabled })}>{hint}</p>
        </div>
      </div>
      {!!files.length && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 px-6 py-5 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <div>
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-sm truncate text-zinc-400">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md text-zinc-400 hover:text-white flex-shrink-0"
                onClick={() => onRemove(file)}
              >
                <span className="sr-only">Remove File</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
      {errorMessage && (
        <p className="text-sm text-red-600 mt-2 w-full max-w-full">{errorMessage}</p>
      )}
    </div>
  );
};
