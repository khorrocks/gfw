import { connect } from 'react-redux';

import { getProjectsWithImages } from 'pages/sgf/section-projects/section-projects-selectors';

import * as actions from './section-projects-modal-actions';
import SectionProjectsModalComponent from './section-projects-modal-component';

const mapStateToProps = ({ location, sgfProjects }) => {
  const slug = location && location.query && location.query.sgfModal;
  const { projects, images } = (sgfProjects && sgfProjects.data) || {};
  const allProjects = getProjectsWithImages({ data: projects, images });

  return {
    slug,
    data: allProjects && allProjects.find(p => p.id === parseInt(slug, 10))
  };
};

export default connect(mapStateToProps, actions)(SectionProjectsModalComponent);
