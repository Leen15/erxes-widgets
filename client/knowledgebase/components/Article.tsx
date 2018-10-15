import * as moment from "moment";
import * as React from "react";
import { defaultAvatar } from "../../icons/Icons";
import { __ } from "../../utils";
import { IKbArticle } from "../types";

type Props = {
  article: IKbArticle;
  onClick: (article: IKbArticle) => void;
};

export default class Article extends React.Component<Props> {
  handleOnClick = (event: React.FormEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const { article, onClick } = this.props;

    onClick(article);
  };

  render() {
    const { article } = this.props;
    const { author } = article;
    const authorDetails = author.details || {
      fullName: "",
      avatar: defaultAvatar
    };

    return (
      <a className="erxes-kb-item" onClick={this.handleOnClick}>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <div className="item-meta flex-item">
          <div className="avatars">
            <img
              alt={authorDetails.fullName}
              src={authorDetails.avatar || defaultAvatar}
            />
          </div>
          <div>
            <div>
              {__("Written by")}: <span>{authorDetails.fullName}</span>
            </div>
            <div>
              {article.modifiedDate ? __("Modified ") : __("Created ")}
              <span>
                {moment(
                  article.modifiedDate
                    ? article.modifiedDate
                    : article.createdDate
                ).format("lll")}
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }
}