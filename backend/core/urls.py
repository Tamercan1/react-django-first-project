from django.urls import path, include
from .views import TopicList, TopicDetail, CreateUserView, NoteList, NoteDelete
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("topics/", TopicList.as_view(), name="topic_list"),
    path("topics/<int:pk>", TopicDetail.as_view(), name="update"),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("notes/", NoteList.as_view(), name="note_list"),
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete_note"),
    path("api-auth/", include("rest_framework.urls"))
]