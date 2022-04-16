const SearchBar = () => {
  return (
    <div className="search-bar">
      <form className="search-form">
        <input type="search" maxLength={32} placeholder="检索文章" className="search-input" />
        <img
          src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6401156ae5d55b2253b3d2351231f02c.svg"
          alt="搜索"
          className="search-icon"
        />
      </form>
    </div>
  );
};
export default SearchBar;
