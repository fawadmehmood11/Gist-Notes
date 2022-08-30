import React from "react";
import "./styling/GistsList.css";
import { Link } from "react-router-dom";
import ProfileAvatar from "../components/ProfileAvatar";

const GistsList = ({ gistsData }) => {
  return (
    <div>
      <table className="container table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th></th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Keyword</th>
            <th>Notebook Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {gistsData &&
            gistsData.map((data) => {
              const filesList = Object.keys(data.files)[0];
              const fileName = data.files[filesList].filename.substring(0, 15);
              const fileType = data.files[filesList].type;
              return (
                <tr key={data.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Link
                      to={`/gist/${data.id}`}
                      style={{ width: "35px", display: "inline-block" }}
                    >
                      <ProfileAvatar avatarUrl={data.owner.avatar_url} />
                    </Link>
                  </td>
                  <td>{data.owner.login}</td>
                  <td>{new Date(data.created_at).toLocaleDateString()}</td>
                  <td>{new Date(data.created_at).toLocaleTimeString()}</td>
                  <td>{fileType}</td>
                  <td>{fileName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GistsList;
