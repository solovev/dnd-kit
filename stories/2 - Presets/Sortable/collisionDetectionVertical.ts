import type {CollisionDescriptor, CollisionDetection} from '@dnd-kit/core';

export function sortCollisionsAsc(
  {data: {value: a}}: CollisionDescriptor,
  {data: {value: b}}: CollisionDescriptor
) {
  return a - b;
}

/**
 * Returns the intersecting rectangle area between two rectangles
 */
export function getDistanceVertical(
  entry: ClientRect,
  target: ClientRect
): number {
  if (entry.top > target.bottom) {
    return entry.top - target.bottom;
  }
  return target.top - entry.bottom;
}

/**
 * Returns the rectangles that has the greatest intersection area with a given
 * rectangle in an array of rectangles.
 */
export const collisionDetectionVertical: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
}) => {
  const collisions: CollisionDescriptor[] = [];

  for (const droppableContainer of droppableContainers) {
    const {id} = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const distance = getDistanceVertical(rect as any, collisionRect as any);
      if (distance < 100) {
        collisions.push({
          id,
          data: {droppableContainer, value: distance},
        });
      }
    }
  }

  return collisions.sort(sortCollisionsAsc);
};
