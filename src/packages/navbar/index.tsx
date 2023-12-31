import { useState } from 'react';
import { useAuth } from '../common/hooks/useAuth';
import { useProfile } from '@/auth/useProfile';
import Modal from 'react-modal';
import { Form } from '@/common/headless/Form';
import { useControlModal } from '@/common/hooks/useModal';
import { useForm } from 'react-hook-form';
import { shareApi } from '@/rest/private/video';
import router from 'next/router';
import { Button } from '@/common/headless/Button';
import { YoutubePattern } from '@/common/constants';
import { type VideoForm } from '@/common/types';
import { useToast } from '@/common/hooks/useToast';

type Props = {
  onSuccess?: () => void;
};
const Navbar = ({ onSuccess }: Props) => {
  const { logout } = useAuth();
  const { email } = useProfile();
  const { toastError } = useToast();
  const [isOpenMobile, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, openModal, closeModal } = useControlModal();
  const methods = useForm<VideoForm>({
    defaultValues: {
      title: '',
      url: '',
      description: '',
    },
  });

  const onSubmit = async (data: VideoForm) => {
    try {
      setIsSubmitting(true);
      await shareApi(data);
      closeModal();
      onSuccess?.();
    } catch (error: any) {
      toastError(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container'>
          <div className='flex items-center justify-between h-16 text-white'>
            <div className='flex-shrink-0 text-4xl' data-testid='logo'>
              MOVIES FUNNY
            </div>
            <div className='hidden lg:block'>
              <div className='ml-4 flex items-center md:ml-6 gap-3'>
                <div data-testid='email'>Welcome {email}</div>
                <Button text='Share a movie' handleLink={openModal} data-testid='share-video' />
                <Button text='Logout' handleLink={logout} data-testid='signout' />
              </div>
            </div>
            <div className='-mr-2 flex lg:hidden items-center gap-3'>
              <div>Welcome {email}</div>
              <button
                onClick={() => setIsOpen(!isOpenMobile)}
                className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                aria-label='Toggle menu'
                data-testid='toggle-menu'>
                <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
              {isOpenMobile && (
                <div className='origin-top-right absolute top-[50px] right-0 mt-2 w-48 rounded-md shadow-lg'>
                  <div className='py-1 bg-white rounded-md shadow-xs'>
                    <button
                      onClick={openModal}
                      className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      data-testid='share-video-mb'>
                      Share a video
                    </button>
                    <button
                      onClick={logout}
                      className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      data-testid='signout-mb'>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Modal isOpen={isOpen}>
        <Form methods={methods} onSubmit={onSubmit}>
          <Form.Input
            className='mb-6'
            label='Title'
            name='title'
            rules={{
              required: {
                value: true,
                message: 'Please enter your title',
              },
            }}
          />
          <Form.ErrorMessage name='title' />
          <Form.Input
            className='mb-6'
            label='Youtube URL'
            name='url'
            rules={{
              required: {
                value: true,
                message: 'Please enter your url',
              },
              pattern: {
                value: YoutubePattern,
                message: 'Please enter a valid youtube url',
              },
            }}
          />
          <Form.ErrorMessage name='url' />
          <Form.Input className='mb-6' label='Description' name='description'></Form.Input>
          <Form.ErrorMessage name='description' />
          <div className='flex justify-end'>
            <button onClick={closeModal} className='mr-5 border px-4 py-2 rounded-lg'>
              Close
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-indigo-600 text-white px-4 py-2 rounded-lg'>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar;
