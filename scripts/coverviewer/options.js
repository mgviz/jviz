//CoverViewer Options function
CoverViewer.prototype.Options = function(opt)
{
  //For test mode
  if(typeof opt.testMode !== 'undefined'){ this.default.test = opt.testMode; }

  //Check for show button settings
  if(typeof opt.showBtnSettings !== 'undefined'){ this.navbar.btnSettingsShow = opt.showBtnSettings; }

  //Check for show the preview track
  if(typeof opt.showTrackPreview !== 'undefined') { this.preview.show = opt.showTrackPreview; }

  //Check for show the names track
  if(typeof opt.showTrackNames !== 'undefined') { this.names.show = opt.showTrackNames; }

  //Check for show the cover track
  if(typeof opt.showTrackCover !== 'undefined'){ this.cover.show = opt.opt.showTrackCover; }

  //Check for show the genes track
  if(typeof opt.showTrackGenes !== 'undefined'){ this.genes.show = opt.showTrackGenes; }

  //Check for gaus filter times
  if(typeof opt.gaussFilter !== 'undefined'){ this.gauss.times = opt.gaussFilter; }

  //Check for fix cover gaps
  if(typeof opt.coverFixGaps !== 'undefined'){ this.data.cover.fixgaps = opt.coverFixGaps; }

};
