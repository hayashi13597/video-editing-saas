import React from "react";

const VideoVersionList = () => {
  return (
    <div className="space y-3">
      <h3 className="small-title">バージョン管理</h3>
      <div className="space-y-1">
        <div className="flex-between bg-light-green p-2.5 rounded-6">
          <span className="text-green-main">ver_03.mp4</span>
          <span className="very-small-text">2025/07/01</span>
        </div>
        <div className="flex-between bg-light-green p-2.5 rounded-6">
          <span className="text-green-main">ver_02.mp4</span>
          <span className="very-small-text">2015/06/01</span>
        </div>
        <div className="flex-between bg-light-green p-2.5 rounded-6">
          <span className="text-green-main">ver_01.mp4</span>
          <span className="very-small-text">2015/05/01</span>
        </div>
      </div>
    </div>
  );
};

export default VideoVersionList;
