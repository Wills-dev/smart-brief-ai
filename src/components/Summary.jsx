import { useState, useEffect } from "react";
import { copy, linkIcon, tick, sendIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { Spin, Modal } from "antd";

const Summary = () => {
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState("");
  const [errors, setErrors] = useState(true);
  const [allArticles, setAllArticles] = useState([]);
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesStoredInLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesStoredInLocalStorage) {
      setAllArticles(articlesStoredInLocalStorage);
    }

    if (article?.summary) {
      setModal(true);
    }

    if (error) {
      setErrors(true);
    }
  }, [error, article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };

      const updatedAllArticles = [newArticle, ...allArticles];
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
    }
  };

  const handleCancelError = () => {
    setErrors(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleCopy = (URL) => {
    setCopied(URL);
    navigator.clipboard.writeText(URL);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex justify-center items -center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt=""
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            name=""
            value={article.url}
            placeholder="Enter article URL"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-[#EE99C2]"
          >
            <img src={sendIcon} alt="" className="w-3 object-contain" />
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles?.slice(0, 2)?.map((item, index) => (
            <div className="link_card" key={`link-${index}`}>
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p
                className="flex-1 font-satoshi text-pink-300 font-medium text-sm truncate"
                onClick={() => setArticle(item)}
              >
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <Spin />
        ) : error ? (
          <Modal open={errors} onCancel={handleCancelError} footer={null}>
            <p className="font-inter font-bold text-gray-500 text-center py-6">
              {error?.data?.error
                ? error?.data?.error
                : "Something went wrong!!! Check the URL and try again."}
            </p>
          </Modal>
        ) : null}

        <Modal open={modal} onCancel={handleCancel} footer={null} width={600}>
          <div className="flex flex-col gap-3 py-6">
            <h2 className=" font-satoshi font-bold text-gray-700 text-xl">
              Summarized Article
            </h2>
            <div className="summary_box">
              <p className="font-inter font-medium text-sm text-gray-500">
                {article?.summary}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Summary;
