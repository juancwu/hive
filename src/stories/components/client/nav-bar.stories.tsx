import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '@/components/client';
import SupabaseProvider from '@/providers/supabase-provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function supabaseDecorator(Story: any, session: any) {
  return (
    <SupabaseProvider session={session}>
      <Story />
    </SupabaseProvider>
  );
}

const session = {
  user: {
    id: '1',
    aud: 'authenticated',
    role: 'authenticated',
    email: '',
    created_at: '2021-08-12T19:54:53.000Z',
    updated_at: '2021-08-12T19:54:53.000Z',
  },
};

const meta: Meta<typeof NavBar> = {
  title: 'components/client/NavBar',
  component: NavBar,
  tags: ['autodocs'],
};

export default meta;
type NavBarStory = StoryObj<typeof NavBar>;

export const HomeSignedOut: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, null)],
};

export const HomeSignedIn: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, session)],
};

export const InventorySignedOut: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inventory',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, null)],
};

export const InventorySignedIn: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inventory',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, session)],
};

export const ProjectsSignedOut: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/projects',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, null)],
};

export const ProjectsSignedIn: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/projects',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, session)],
};

export const ProfileSignedOut: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/profile',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, null)],
};

export const ProfileSignedIn: NavBarStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/profile',
      },
    },
  },
  decorators: [(Story) => supabaseDecorator(Story, session)],
};
