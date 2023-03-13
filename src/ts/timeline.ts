import { timelineContainer } from "./dom";

export interface TimelineItem {
  name: string;
  date: Date;
  picture: string;
  description: string;
}

const timeline: TimelineItem[] = [];

const timelineStrings = timeline.map((item) => {
  return `
    <div>
        Timeline item:${item.name}
    </div>
    `;
});

timelineContainer.innerHTML = timelineStrings.join("");
