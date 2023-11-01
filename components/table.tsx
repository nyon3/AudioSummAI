import prisma from '@/lib/prisma';
import { timeAgo } from '@/lib/utils';
import Image from 'next/image';
import RefreshButton from './refresh-button';
import UserFileList from './list';

// Assuming User type is defined somewhere or imported from Prisma client
type User = {
  files: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    url: string;
    userId: string;
    transcription: string | null;
  }[];
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

export default async function Table() {
  const startTime = Date.now();
  const users: User[] = await prisma.user.findMany({
    include: {
      files: true,
    },
  });

  const duration = Date.now() - startTime;

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <p className="text-sm text-gray-500">
            Fetched {users.length} users in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {users.map((user) => (
          <div
            key={user.name ? user.name : 'unknown'}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={user.image ? user.image : 'default_image_url'} 
                alt={user.name ? user.name : 'Unknown User'}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name ? user.name : 'Unknown'}</p>
                <p className="text-sm text-gray-500">{user.email ? user.email : 'Unknown'}</p>
                <div>
                  <UserFileList />
                  {/* separator */}
                  <div className="border-t border-gray-200 my-4" />
                </div>
              </div>
            </div>
            {/* If 'createdAt' exists on 'user.files', you would need to map through 'user.files' to access it */}
          </div>
        ))}
      </div>
    </div>
  );
}
