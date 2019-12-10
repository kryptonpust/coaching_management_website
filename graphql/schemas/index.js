const { buildSchema } = require("graphql");

module.exports = buildSchema(`
scalar Date
type Users {
    id: Int!
    name: String!
    email: String!
    phone: String
}
type jwt{
    id: Int!
    token: String!
    access: String!
}
input login {
    email: String!
    password: String!
    access: String
}
input UserInput {
    name: String!
    email: String!
    password : String!
    phone: String
}
type Dochtml{
    page: String
}
type notices {
    id: Int!
    title: String
    file: String
    updatedAt: Date!
}
type noticePaginate {
    count : Int!
    page: Int!
    rows : [notices]!
}
type notes {
    id: Int!
    chapterid: Int!
    title: String
    file: String
}
type notePaginate {
    count : Int!
    page: Int!
    rows : [notes]!
}
type videos {
    id: Int!
    chapterid: Int!
    title: String
    file: String
    updatedAt: Date!
}
type videoPaginate {
    count : Int!
    page: Int!
    rows : [videos]!
}

type videocomments {
    id: Int!
    videoid: Int!
    title: String
    comment: String
    updatedAt: Date!
}

type images {
    id: Int!
    sessionid: Int!
    link: String
}
type imagePaginate {
    count : Int!
    page: Int!
    rows : [images]!
}
type featureimages {
    id: Int!
    src: String!
}
type links {
    id: Int!
    catagoryid:Int!
    title: String
    link: String
}
type linkPaginate {
    count : Int!
    page: Int!
    rows : [links]!
}

type chapters{
    id: Int!
    title: String
}
type chapterPaginate {
    count : Int!
    page: Int!
    rows : [chapters]!
}
type sessions{
    id: Int!
    title: String
}
type sessionPaginate {
    count : Int!
    page: Int!
    rows : [sessions]!
}
type linkCatagories{
    id: Int!
    title: String
}
type linkCatagoriesPaginate {
    count : Int!
    page: Int!
    rows : [linkCatagories]!
}

type RootQuery {
    users: [Users!]!
    login(credentials: login): jwt!
    aboutUs: Dochtml!
    profile: Dochtml!
    profilePic: Dochtml!
    notices(size: Int!,page: Int!) : noticePaginate
    notes(size: Int!,page: Int!) : notePaginate
    allChapters: [chapters]!
    chapters(size: Int!,page: Int!) : chapterPaginate
    links(size: Int!,page: Int!) : linkPaginate
    filterNotes(chapterid: Int!): [notes]!
    allLinkCatagories: [linkCatagories]!
    linkCatagories(size: Int!,page: Int!) : linkCatagoriesPaginate
    filterLinks(catagoryid:Int!): [links]!
    allNotices: [notices]!
    videos(size: Int!,page: Int!) : videoPaginate
    filterVideos(chapterid: Int!): [videos]!
    filterVideocomments(videoid: Int!): [videocomments]!
    allSessions: [sessions]!
    sessions(size: Int!,page: Int!) : sessionPaginate
    images(size: Int!,page: Int!) : imagePaginate
    filterImages(sessionid: Int!): [images]!
    allFeatureimages: [featureimages]!
    latestNotices(size: Int!): [notices]!
}
type RootMutation {
    createUser(userInput: UserInput!): Users!
    editAboutUs(html: String!): Dochtml!
    editProfile(html: String!): Dochtml!
    editProfilePic(html: String!): Dochtml!
    editNotices(id: Int,title: String!,file: String): notices
    deleteNotices(id: Int!): Boolean
    editNotes(id: Int,chapterid: Int!,title: String!,file: String): notes
    deleteNotes(id: Int!): Boolean
    editChapters(id: Int,title: String!): chapters
    deleteChapters(id: Int!): Boolean
    editLinks(id: Int,catagoryid: Int!title: String!,link: String): links
    deleteLinks(id: Int!): Boolean
    editLinkCatagories(id: Int,title: String!): linkCatagories
    deleteLinkCatagories(id: Int!): Boolean
    editVideos(id: Int,chapterid: Int!,title: String!,file: String): videos
    deleteVideos(id: Int!): Boolean
    editVideocomments(videoid: Int!,title: String!,comment: String!): videocomments!

    editSessions(id: Int,title: String!): sessions
    deleteSessions(id: Int!): Boolean

    editImages(id: Int,sessionid: Int!,link: String): images
    deleteImages(src: String!): Boolean
    editFeatureimages(id: Int,src: String): featureimages
    deleteFeatureimages(src: String!): Boolean
}
schema {
    query: RootQuery
    mutation: RootMutation
}    
`);
