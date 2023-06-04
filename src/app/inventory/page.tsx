import { Button } from '@/ui/client';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Inventory() {
  return (
    <div>
      <Button icon={<PlusIcon />}>Test with icon</Button>
    </div>
  );
}
