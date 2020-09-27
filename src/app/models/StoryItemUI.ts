
export class StoryItemUI {

  containerID: string;
  storyID: number;
  isExpanded?: boolean;

  constructor(containerID: string, storyID: number, isExpanded = false) {
    this.containerID = containerID;
    this.storyID = storyID;
    this.isExpanded = isExpanded;
  }

}

export const composeComponentID = (containerID: string, storyID: number) => {
  return `${containerID}:${storyID}`;
};

export const selectComponentID = (component: StoryItemUI): string => {
  return composeComponentID(component.containerID, component.storyID);
};


