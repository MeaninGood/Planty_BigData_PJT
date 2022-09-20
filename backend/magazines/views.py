from django.shortcuts import render
from rest_framework.response import Response
from .models import Magazine
from rest_framework import viewsets, status
from .serializers import MagazineSerializer
from accounts.models import User

# Create your views here.
class MagazineViewSet(viewsets.ModelViewSet):
    queryset = Magazine.objects.all()
    serializer_class = MagazineSerializer

    # 기존 구성된 내용에 오버라이딩 가능
    # get에 매칭, 리스트
    def list(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # get에 매칭, 상세페이지
    def retrieve(self, request, pk):
        serializer = self.get_serializer(Magazine.objects.get(pk=pk))
        return Response(serializer.data, status=status.HTTP_200_OK)


    # post에 매칭, 게시글 쓰기
    def create(self, request):
        serializer = MagazineSerializer(data=request.data)
        user = request.user
        if serializer.is_valid():
            serializer.save(user=user)
            user.exp = user.exp + 1
            user.articles_count = user.articles_count + 1
            user.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

    
    # delete에 매칭, 게시글 삭제
    def destroy(self, request, pk):
        magazine = Magazine.objects.get(pk=pk)
        user = request.user
        if user == magazine.user:
            magazine.delete()

            user.articles_count = user.articles_count - 1
            user.save()
            
            data = {
                'delete': f'{pk}번 데이터가 삭제되었습니다.'
            }
            return Response(data, status=status.HTTP_200_OK)


class MagazineLikeView(viewsets.ViewSet):
    
    def like(self, request, pk):
        magazine = Magazine.objects.get(pk=pk)
        user = request.user
        if magazine.likes.filter(pk=user.pk).exists():
            magazine.likes.remove(user)
            magazine.likes_count = magazine.likes_count - 1
            magazine.save()

            user.likes_count = user.likes_count - 1
            user.save()

            return Response({'data' : 'Unlike_Magazine OK'}, status=status.HTTP_200_OK)

        else:
            magazine.likes.add(user)
            magazine.likes_count = magazine.likes_count + 1
            magazine.save()

            user.likes_count = user.likes_count + 1
            user.save()

            return Response({'data' : 'Like_Magazine OK'}, status=status.HTTP_200_OK)
