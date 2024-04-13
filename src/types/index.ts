export interface Project {
  id: number;
  title: string;
  url: string;
  headline: string;
  github: string;
  views: number;
  likes: number;
  comments: number;
  avgRating: number;
  dateCreated: string;
}

export interface CreateProject {
  projectInfo: {
    title: string;
    headline: string;
    url: string;
    github: string;
  };
  projectMedia: string[];
  projectHighlights: ProjectHighlight[];
}

export interface ProjectHighlight {
  media: string;
  description: string;
  title: string;
}

export interface ProjectHighlightUpdate extends ProjectHighlight {
  handleUpdateProjectHighlight: (highlight: ProjectHighlight) => void;
  handleDeleteProjectHighlight: () => void;
}
