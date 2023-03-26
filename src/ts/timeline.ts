import { timelineContainer } from "./dom";

export interface TimelineItem {
  name: string;
  date: Date;
  picture: string;
  description: string;
}

const timeline: TimelineItem[] = [
  {
    name: "test",
    date: new Date(),
    description: "asdfasdfasdfasdfasdfasdfasdfasdfasdf",
    picture: "asdfasdfadsf",
  },
];

const timelineStrings = timeline.map((item) => {
  return `
    <div class="timeline-item">
      <div class="timeline-item-dot"></div>
      <div class="timeline-item-content">
        <div>Date</div>
        <div>Name</div>
        <div>Description</div>
      </div>
    </div>
    `;
});

timelineContainer.innerHTML = timelineStrings.join("");
