'use client';

import React, { FC, Fragment, useCallback, useState } from 'react';
import { Button } from '@/ui/client/button';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { TextInput } from '@/ui/client/text-input';
import { buttonStyles } from '@/styles/components/button.styles';
import { TextArea } from '@/ui/client/text-area';
import { useKeybind } from '@/hooks/use-keybind';
import { FileInput } from '@/ui/client/file-input';
import { formatBytes } from '@/lib/helpers/format-bytes';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useForm } from '@/hooks/use-form';

export const InventoryCreatePart: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [datasheet, setDatasheet] = useState<File[]>([]);
  const openPanel = useCallback(() => setIsOpen(true), []);
  const closePanel = useCallback(() => setIsOpen(false), []);
  const handleHotkey = useCallback(() => setIsOpen((current) => !current), []);
  const onFileInputChange = useCallback((acceptedFiles: File[]) => {
    setDatasheet(acceptedFiles);
    return acceptedFiles;
  }, []);
  const onFileInputRemove = useCallback((file: File) => {
    setDatasheet((curr) => curr.filter((_file) => _file.name !== file.name));
  }, []);

  useKeybind(['alt', 'n'], handleHotkey, {
    enabled: true,
  });

  const createPartForm = useForm({
    initialValues: {
      partName: '',
      quantityInStock: 0,
    },
  });

  return (
    <>
      <Button onClick={openPanel} className="md:inline-block hidden">
        Create Part
      </Button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closePanel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-zinc-900 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-semibold leading-6 text-white">
                            Create New Part
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md text-zinc-400 hover:text-white"
                              onClick={closePanel}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={createPartForm.onSubmit((v) => {
                            console.log(v);
                          })}
                        >
                          <div className="space-y-12">
                            <div className="border-b border-white/5 pb-12">
                              <h2 className="text-base font-semibold leading-7 text-white">
                                Basic Information
                              </h2>
                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <TextInput
                                    label="Name"
                                    placeholder="Enter the name of the part"
                                    name="name"
                                    type="text"
                                    maxLength={80}
                                    required
                                    {...createPartForm.getInputProps('partName')}
                                  />
                                </div>
                                <div className="col-span-full">
                                  <TextArea
                                    name="description"
                                    label="Description"
                                    hint="Write down details that can not be capture in the part name."
                                    maxLength={500}
                                  />
                                </div>
                                <div className="sm:col-span-4">
                                  <TextInput
                                    label="Quantity In Stock"
                                    placeholder="Enter quantity available in stock"
                                    name="quantityInStock"
                                    type="text"
                                    maxLength={10}
                                    required
                                    {...createPartForm.getInputProps('quantityInStock')}
                                  />
                                </div>
                                <div className="col-span-full">
                                  <FileInput
                                    label="Datasheet"
                                    inputText="Select Datasheet"
                                    accept={{
                                      'application/pdf': [],
                                    }}
                                    maxFiles={1}
                                    maxSize={10485760}
                                    hint={`PDF Only (Max Size ${formatBytes(10485760)})`}
                                    onAdd={onFileInputChange}
                                    onRemove={onFileInputRemove}
                                    files={datasheet}
                                  />
                                </div>
                                <div className="sm:col-span-4">
                                  <TextInput
                                    label="Manufacturer"
                                    placeholder="Enter manufacturer's name"
                                    name="manufacturer"
                                    maxLength={30}
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-12">
                              <Disclosure>
                                {({ open }) => (
                                  <React.Fragment>
                                    <Disclosure.Button className="flex w-full justify-between rounded-md bg-white/10 px-4 py-2 text-left text-sm font-medium text-white hover:bg-white/25 transition">
                                      <span>More Details</span>
                                      <ChevronUpIcon
                                        className={`h-6 w-6 ${open ? 'rotate-180' : ''}`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel>more info</Disclosure.Panel>
                                  </React.Fragment>
                                )}
                              </Disclosure>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button
                              type="submit"
                              className={buttonStyles({ intent: 'success' })}
                            >
                              Save
                            </Button>
                            <Button type="button" intent="secondary" onClick={closePanel}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
